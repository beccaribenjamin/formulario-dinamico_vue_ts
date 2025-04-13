<template>
  <v-text-field
    v-model="modelValue"
    :label="label"
    :type="showPassword ? 'text' : 'password'"
    :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
    @click:append-inner="toggleVisibility"
    :rules="validationRules"
    :error-messages="errorMessages"
    hide-details="auto"
    clearable
    :maxlength="maxLength"
  />
</template>

<script setup lang="ts">
import { computed, toRef, ref } from 'vue'
import useFieldValidation from '@/composables/useFieldValidation'

const props = defineProps<{
  modelValue: string
  label: string
  validations?: any[]
  maxLength?: number
  minLength?: number
}>()

const emit = defineEmits(['update:modelValue'])

const modelValue = computed({
  get: () => props.modelValue,
  set: val => emit('update:modelValue', val)
})

const showPassword = ref(false)
const toggleVisibility = () => {
  showPassword.value = !showPassword.value
}

const { validationRules, errorMessages } = useFieldValidation(
  toRef(() => props.modelValue),
  props.validations,
  {
    minLength: props.minLength,
    maxLength: props.maxLength
  }
)
</script>
  