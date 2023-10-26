<script lang="ts">
	import {
		PUBLIC_EMAILJS_PUBLIC_KEY,
		PUBLIC_EMAILJS_SERVICE_ID,
		PUBLIC_EMAILJS_TEMPLATE_ID,
	} from '$env/static/public';
	import emailjs from '@emailjs/browser';

	import Input from './input.svelte';
	import Textarea from './textarea.svelte';
	import type { LocaleTranslations } from '$lib/i18n/translations';

	export let t: LocaleTranslations;

	let inputsValues = {
		name: '',
		surname: '',
		email: '',
		message: '',
	};
	let errors: Record<keyof typeof inputsValues, string | null> = {
		name: null,
		surname: null,
		email: null,
		message: null,
	};
	let sendStatus: { msg: string; isErr: boolean } | null = null;
	let sending = false;

	const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

	function validateLen(val: string, min: number, max: number) {
		if (val.length < min) {
			return t.tooLongErrorIt;
		}
		if (val.length > max) {
			return t.tooShortErrorIt;
		}
		return null;
	}

	function validate() {
		let err = false;

		const nameErr = validateLen(inputsValues.name, 2, 30);
		if (nameErr) {
			errors.name = `${t.contactMeName} ${nameErr} (2 < char < 30)`;
			err = true;
		}

		const surnameErr = validateLen(inputsValues.surname, 2, 30);
		if (surnameErr) {
			errors.surname = `${t.contactMeSurname} ${surnameErr} (2 < char < 30)`;
			err = true;
		}

		if (!emailRegex.test(inputsValues.email)) {
			errors.email = t.invalidEmailError;
			err = true;
		}

		if (inputsValues.message.length < 10) {
			errors.message = t.tooShortErrorMessage;
			err = true;
		}
		if (inputsValues.message.length > 5000) {
			errors.message = t.tooLongErrorMessage;
			err = true;
		}

		return err;
	}

	async function sendEmail() {
		if (validate()) {
			return;
		} else {
			errors = {
				name: null,
				surname: null,
				email: null,
				message: null,
			};
		}

		sending = true;
		try {
			await emailjs.send(
				PUBLIC_EMAILJS_SERVICE_ID,
				PUBLIC_EMAILJS_TEMPLATE_ID,
				{
					from_name: inputsValues.name,
					from_surname: inputsValues.surname,
					from_email: inputsValues.email,
					message: inputsValues.message,
				},
				PUBLIC_EMAILJS_PUBLIC_KEY,
			);

			inputsValues = {
				name: '',
				surname: '',
				email: '',
				message: '',
			};

			sendStatus = { msg: t.sendEmailSuccess, isErr: false };
		} catch (e) {
			console.log(e);
			sendStatus = { msg: t.sendEmailError, isErr: true };
		}
		sending = false;

		setTimeout(() => {
			sendStatus = null;
		}, 10000);
	}
</script>

<form class="mt-5 flex flex-col gap-y-7" on:submit|preventDefault={() => sendEmail()}>
	<div class="w-full flex flex-col sm:flex-row gap-x-10 gap-y-7">
		<Input
			bind:value={inputsValues.name}
			minLen={2}
			maxLen={30}
			label={t.contactMeName}
			id="name"
			inputType="text"
			err={errors.name}
		/>
		<Input
			bind:value={inputsValues.surname}
			minLen={2}
			maxLen={30}
			label={t.contactMeSurname}
			id="surname"
			inputType="text"
			err={errors.surname}
		/>
	</div>

	<Input
		bind:value={inputsValues.email}
		label="Email"
		id="email"
		inputType="email"
		err={errors.email}
	/>
	<Textarea
		bind:value={inputsValues.message}
		label={t.contactMeMessage}
		id="message"
		err={errors.message}
	/>

	<button
		type="submit"
		class="h-10 w-full sm:w-32 flex items-center justify-center text-font-1-light bg-theme rounded-md"
	>
		{#if sending}
			<div class="w-4 h-4 border-2 border-font-1-light border-b-theme animate-spin rounded-full" />
		{:else}
			{t.contactMeSend}
		{/if}
	</button>

	{#if sendStatus}
		<div
			class="w-full h-12 border t rounded-md text-font-1-light dark:text-font-1-dark {sendStatus.isErr
				? 'bg-red-500/20 border-red-500 '
				: ' bg-green-500/20 border-green-500'} flex items-center justify-center"
		>
			<p>
				{sendStatus.msg}
			</p>
		</div>
	{/if}
</form>
