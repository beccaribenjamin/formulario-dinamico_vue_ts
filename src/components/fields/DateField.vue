<template>
    <v-text-field
      v-model="modelValue"
      :label="label"
      type="date"
      :error-messages="errorMessages"
      :rules="validationRules"
      hide-details="auto"
      clearable
    />
  </template>
  
<script setup lang="ts">
import { computed, toRef } from 'vue'
import useFieldValidation from '@/composables/useFieldValidation'

const props = defineProps<{
  modelValue: string
  label: string
  validations?: any[]
  minDate?: string
  maxDate?: string
}>()

const emit = defineEmits(['update:modelValue'])

const modelValue = computed({
  get: () => props.modelValue,
  set: val => emit('update:modelValue', val),
})

const { validationRules, errorMessages } = useFieldValidation(
  toRef(props, 'modelValue'),
  props.validations,
  { minDate: props.minDate, maxDate: props.maxDate }
)
</script>
  