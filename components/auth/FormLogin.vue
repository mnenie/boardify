<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { useForm } from 'vee-validate'

const router = useRouter()
const formSchema = toTypedSchema(z.object({
  email: z.string({ required_error: 'Email is a required field' }).nonempty('Email is a required field').email('Email must be a valid'),
  password: z.string({ required_error: 'Password is a required field' }).nonempty('Password is a required field').min(8, 'Password must be at least 8 characters')
}))
const { handleSubmit } = useForm({
  validationSchema: formSchema,
})

const email = ref('')
const password = ref('')

const authStore = useAuthStore()

const onSubmit = handleSubmit(async (values) => {
  await authStore.login(email.value, password.value)

  email.value = ''
  password.value = ''
})
</script>

<template>
  <form class="w-full">
    <UiFormField v-slot="{ componentField }" name="email">
      <UiFormItem class="mb-4" v-auto-animate>
        <UiFormLabel>Email</UiFormLabel>
        <UiFormControl>
          <UiInput type="email" placeholder="Enter your email" v-bind="componentField" v-model="email" />
        </UiFormControl>
        <UiFormMessage />
      </UiFormItem>
    </UiFormField>
    <UiFormField v-slot="{ componentField }" name="password">
      <UiFormItem class="mb-6" v-auto-animate>
        <UiFormLabel>Password</UiFormLabel>
        <UiFormControl>
          <UiInput type="password" placeholder="Enter your password" v-bind="componentField" v-model="password" />
        </UiFormControl>
        <UiFormMessage />
      </UiFormItem>
    </UiFormField>
    <div class="flex justify-between items-center flex-col space-y-2 mb-6">
      <UiButton @click="onSubmit" class="w-full">Sign In With Email</UiButton>
      <p class="text-gray-500 text-sm">Don't have an account? <span @click="router.push(REGISTRATION_ROUTE)" class="text-gray-950 cursor-pointer border-solid border-b border-gray-950">Sign Up Now</span></p>
    </div>
    <AuthGitHub />
  </form>
</template>
