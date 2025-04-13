<!-- src/components/fields/NumberField.vue -->
<template>
  <v-text-field
    v-model.number="modelValue"
    :label="label"
    type="number"
    :error-messages="errorMessages"
    :rules="validationRules"
    hide-details="auto"
    clearable
    :maxlength="maxLength"
    :minlength="minLength"
    @input="onInput"
  />
</template>

<script setup lang="ts">
import { computed, toRef, watch } from 'vue'
import useFieldValidation from '@/composables/useFieldValidation'

const props = defineProps<{
  modelValue: number | string
  label: string
  validations?: any[]
  maxLength?: number
  minLength?: number
}>()

const emit = defineEmits(['update:modelValue'])

const modelValue = computed({
  get: () => props.modelValue,
  set: val => emit('update:modelValue', val),
})

const { validationRules, errorMessages } = useFieldValidation(
  toRef(props, 'modelValue'),
  props.validations,
  { maxLength: props.maxLength, minLength: props.minLength }
)

// Función para evitar que el usuario ingrese más dígitos de los permitidos
const onInput = (event: Event) => {
  const inputElement = event.target as HTMLInputElement
  if (props.maxLength && inputElement.value.length > props.maxLength) {
    inputElement.value = inputElement.value.slice(0, props.maxLength)
    modelValue.value = inputElement.value
  }
  if (props.minLength && inputElement.value.length < props.minLength) {
    modelValue.value = inputElement.value
  }
}
</script>
