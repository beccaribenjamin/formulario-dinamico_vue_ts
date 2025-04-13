<!-- src/components/fields/TextField.vue -->
<template>
  <v-text-field
    v-model="modelValue"
    :label="label"
    :rules="validationRules"
    :error-messages="errorMessages"
    hide-details="auto"
    clearable
    :maxlength="maxLength"
  />
</template>

<script setup lang="ts">
import { computed, toRef } from 'vue'
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

const { validationRules, errorMessages } = useFieldValidation(
  toRef(() => props.modelValue),
  props.validations,
  {
    minLength: props.minLength,
    maxLength: props.maxLength
  }
)
</script>
