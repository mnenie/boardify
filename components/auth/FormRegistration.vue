<script setup lang="ts">
import { v4 as uuid } from 'uuid'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { useForm } from 'vee-validate'

const authStore = useAuthStore()
const router = useRouter()

const formSchema = toTypedSchema(z.object({
  name: z.string({ required_error: 'Name is a required field' }).nonempty('Name is a required field').min(2).max(40),
  email: z.string({ required_error: 'Email is a required field' }).nonempty('Email is a required field').email('Email must be a valid'),
  password: z.string({ required_error: 'Password is a required field' }).nonempty('Password is a required field').min(8, 'Password must be at least 8 characters')
}))
const { handleSubmit } = useForm({
  validationSchema: formSchema,
})

const nameReg = ref<string>('')
const emailReg = ref<string>('')
const passwordReg = ref<string>('')

const onSubmit = handleSubmit(async (values) => {
  await authStore.registration(uuid(), emailReg.value, passwordReg.value, nameReg.value)
  emailReg.value = ''
  nameReg.value = ''
  passwordReg.value = ''
})
</script>

<template>
  <form class="w-full" @submit.prevent>
    <UiFormField v-slot="{ componentField }" name="name">
      <UiFormItem class="mb-4" v-auto-animate>
        <UiFormLabel>Name</UiFormLabel>
        <UiFormControl>
          <UiInput type="text" placeholder="Enter your name" v-bind="componentField" v-model="nameReg" />
        </UiFormControl>
        <UiFormMessage />
      </UiFormItem>
    </UiFormField>
    <UiFormField v-slot="{ componentField }" name="email">
      <UiFormItem class="mb-4" v-auto-animate>
        <UiFormLabel>Email</UiFormLabel>
        <UiFormControl>
          <UiInput type="email" placeholder="Enter your email" v-bind="componentField" v-model="emailReg" />
        </UiFormControl>
        <UiFormMessage />
      </UiFormItem>
    </UiFormField>
    <UiFormField v-slot="{ componentField }" name="password">
      <UiFormItem class="mb-8" v-auto-animate>
        <UiFormLabel>Password</UiFormLabel>
        <UiFormControl>
          <UiInput type="password" placeholder="Enter your password" v-bind="componentField" v-model="passwordReg" />
        </UiFormControl>
        <UiFormMessage />
      </UiFormItem>
    </UiFormField>
    <div class="flex justify-between items-center flex-col space-y-2 mb-6">
      <UiButton @click="onSubmit" class="w-full">Sign Up With Email</UiButton>
      <p class="text-gray-500 text-sm">Have an account? <span @click="router.push(LOGIN_ROUTE)" class="text-gray-950 cursor-pointer border-solid border-b border-gray-950">Sign In Now</span></p>
    </div>
    <AuthAdditional />
  </form>
</template>
