<script setup lang="ts">
import { reactive, ref, watch, onMounted } from 'vue'
import formConfig from '@/formdata/userFormConfig.json'

import TextField from '@/components/fields/TextField.vue'
import EmailField from '@/components/fields/EmailField.vue'
import NumberField from '@/components/fields/NumberField.vue'
import SelectableField from '@/components/fields/SelectableField.vue'
import CheckboxField from '@/components/fields/CheckboxField.vue'
import DateField from '@/components/fields/DateField.vue'
import PasswordField from '@/components/fields/PasswordField.vue'

// Map de componentes
const componentMap: Record<string, any> = {
  text: TextField,
  email: EmailField,
  number: NumberField,
  selectable: SelectableField,
  checkbox: CheckboxField,
  date: DateField,
  password: PasswordField,
}

const form = reactive<Record<string, any>>({})
const loading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

// Inicializo los valores de los campos
formConfig.fields.forEach(field => {
  form[field.name] = field.default ?? ''
})

const STORAGE_KEY = 'formData'

// Inicializo formulario desde localStorage o el JSON
onMounted(() => {
  const savedData = localStorage.getItem(STORAGE_KEY)
  if (savedData) {
    try {
      const parsed = JSON.parse(savedData)
      formConfig.fields.forEach(field => {
        if (Object.prototype.hasOwnProperty.call(parsed, field.name)) {
          form[field.name] = parsed[field.name]
        } else {
          form[field.name] = field.default ?? ''
        }
      })
    } catch (e) {
      console.error('Error al leer localStorage:', e)
    }
  } else {
    formConfig.fields.forEach(field => {
      form[field.name] = field.default ?? ''
    })
  }
})


// Observa cambios y guarda en localStorage automáticamente
watch(
  form,
  (newForm) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newForm))
  },
  { deep: true }
)


function handleSubmit() {
  loading.value = true
  successMessage.value = ''
  errorMessage.value = ''

  setTimeout(() => {
    loading.value = false
    const hasError = Object.values(form).some(v => v === '' || v === null || v === false)

    if (hasError) {
      errorMessage.value = 'Completa todos los campos correctamente.'
    } else {
      successMessage.value = 'Formulario enviado con éxito.'
      console.log('📤 Datos enviados:', JSON.stringify(form, null, 2))
    }
  }, 1000)
}
</script>

<template>
  <v-card class="pa-4" elevation="4" max-width="600" mx-auto>
    <v-card-title class="text-h5">{{ formConfig.formTitle }}</v-card-title>

    <v-card-text>
      <form @submit.prevent="handleSubmit">
        <div v-for="field in formConfig.fields" :key="field.name" class="mb-4">
          <component :is="componentMap[field.type]" v-model="form[field.name]" :label="field.label"
            :maxLength="field.maxLength" :validations="field.validations"
            v-bind="field.type === 'selectable' ? { items: field.options } : {}" />
        </div>

        <v-btn color="primary" type="submit" :loading="loading" block>
          Enviar
        </v-btn>

        <v-alert v-if="successMessage" type="success" class="mt-4">
          {{ successMessage }}
        </v-alert>
        <v-alert v-if="errorMessage" type="error" class="mt-4">
          {{ errorMessage }}
        </v-alert>
      </form>
    </v-card-text>
  </v-card>
</template>
