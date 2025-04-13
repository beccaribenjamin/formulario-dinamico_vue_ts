<template>
  <v-select
    v-model="modelValue"
    :label="label"
    :items="items"
    :error-messages="errorMessages"
    :rules="validationRules"
    clearable
  />
</template>

<script setup lang="ts">
import { computed, toRef } from 'vue'
import useFieldValidation from '../../composables/useFieldValidation'

const props = defineProps<{
  modelValue: string
  label: string
  items: string[]
  validations?: any[]
}>()

const emit = defineEmits(['update:modelValue'])

const modelValue = computed({
    get: () => props.modelValue,
    set: val => emit('update:modelValue', val),
})

const { validationRules, errorMessages } = useFieldValidation(toRef(() => props.modelValue), props.validations)
</script>
