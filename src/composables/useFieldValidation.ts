// src/composables/useFieldValidation.ts
import { computed, ref, Ref } from 'vue'

export default function useFieldValidation(
  model: Ref<any>,
  validations: any[] = [],
  options: { minLength?: number; maxLength?: number; minDate?: string; maxDate?: string } = {}
) {
  const errorMessages = ref<string[]>([])

  const validationRules = computed(() => {
    const rules: ((value: any) => boolean | string)[] = []

    validations.forEach(rule => {
      switch (rule.type) {
        case 'required':
          rules.push((v: any) => !!v || rule.message)
          break
        case 'minLength':
          rules.push((v: any) => !v || String(v).length >= rule.value || rule.message)
          break
        case 'maxLength':
          rules.push((v: any) => !v || String(v).length <= rule.value || rule.message)
          break
        case 'regex':
          rules.push((v: any) => !v || new RegExp(rule.pattern).test(v) || rule.message)
          break
        case 'complex':
          if (rule.rules.noNumbers) {
            rules.push((v: any) => !v || !/\d/.test(v) || rule.message)
          }
          break
      }
    })

    // Agrega las validaciones para minDate y maxDate si se estan en las opciones
    if (options.minDate) {
      rules.push((v: any) => {
        if (v && new Date(v) < new Date(options.minDate)) {
          return `La fecha no puede ser anterior a ${options.minDate}.`
        }
        return true
      })
    }

    if (options.maxDate) {
      rules.push((v: any) => {
        if (v && new Date(v) > new Date(options.maxDate)) {
          return `La fecha no puede ser posterior a ${options.maxDate}.`
        }
        return true
      })
    }

    // Validación para maxLength, si no se aclara en validations
    if (options.maxLength !== undefined && !validations.some(v => v.type === 'maxLength')) {
      rules.push((v: any) => !v || v.length <= options.maxLength || `No puede tener más de ${options.maxLength} caracteres.`)
    }

    return rules
  })

  return { validationRules, errorMessages }
}
