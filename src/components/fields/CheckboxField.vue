<template>
  <v-checkbox
    v-model="modelValue"
    :label="label"
    :error-messages="errorMessages"
    :rules="validationRules"
    hide-details="auto"
  />
</template>

<script setup lang="ts">
import { computed, toRef } from 'vue'
import useFieldValidation from '@/composables/useFieldValidation'

const props = defineProps<{
  modelValue: boolean
  label: string
  validations?: any[]
}>()

const emit = defineEmits(['update:modelValue'])

const modelValue = computed({
  get: () => props.modelValue,
  set: val => emit('update:modelValue', val),
})

const { validationRules, errorMessages } = useFieldValidation(
  toRef(props, 'modelValue'),
  props.validations
)
</script>
