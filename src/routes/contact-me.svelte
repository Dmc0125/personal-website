<script lang="ts">
	import {
		PUBLIC_EMAILJS_PUBLIC_KEY,
		PUBLIC_EMAILJS_SERVICE_ID,
		PUBLIC_EMAILJS_TEMPLATE_ID,
	} from '$env/static/public';
	import { currentTranslations } from '$lib/i18n/translator';
	import emailjs from '@emailjs/browser';
	import { cubicInOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';

	let inputsValues = {
		name: '',
		email: '',
		message: '',
	};

	let sending = false;
	let notification = {
		show: false,
		message: '',
		isErr: false,
	};

	const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

	async function sendEmail() {
		if (!emailRegex.test(inputsValues.email)) {
			notification.show = true;
			notification.message = 'Email is invalid';
			notification.isErr = true;
			return;
		}

		notification.show = false;
		sending = true;
		try {
			await emailjs.send(
				PUBLIC_EMAILJS_SERVICE_ID,
				PUBLIC_EMAILJS_TEMPLATE_ID,
				{
					from_name: inputsValues.name,
					from_email: inputsValues.email,
					message: inputsValues.message,
				},
				PUBLIC_EMAILJS_PUBLIC_KEY,
			);

			notification.show = true;
			notification.message = 'Email sent successfully';
			notification.isErr = false;
			inputsValues = {
				name: '',
				email: '',
				message: '',
			};

			setTimeout(() => {
				notification.show = false;
			}, 5000);
		} catch (e) {
			console.log(e);
			notification.show = true;
			notification.message = 'Unable to send error';
			notification.isErr = true;
			setTimeout(() => {
				notification.show = false;
			}, 5000);
		}
		sending = false;
	}
</script>

{#if notification.show}
	<div
		transition:fly={{ duration: 150, easing: cubicInOut, opacity: 0, x: 300 }}
		class="
			w-fit min-h-12 px-4 py-3 rounded-md fixed bottom-10 right-5 z-10 font-medium flex items-center gap-x-4
		 	 {notification.isErr ? ' bg-red-200' : 'bg-green-200'} text-slate-800
		"
	>
		{#if notification.isErr}
			<svg class="w-10 h-10 rotate-45" viewBox="0 0 24 24" fill="none">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke="currentColor"
					d="M12 8V16M8 12H16M19.5 12C19.5 16.1421 16.1421 19.5 12 19.5C7.85786 19.5 4.5 16.1421 4.5 12C4.5 7.85786 7.85786 4.5 12 4.5C16.1421 4.5 19.5 7.85786 19.5 12Z"
				/>
			</svg>
		{:else}
			<svg class="w-10 h-10" viewBox="0 0 24 24" fill="none">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke="currentColor"
					d="M8 11.5L11 14.5L16 9.5M19.5 12C19.5 16.1421 16.1421 19.5 12 19.5C7.85786 19.5 4.5 16.1421 4.5 12C4.5 7.85786 7.85786 4.5 12 4.5C16.1421 4.5 19.5 7.85786 19.5 12Z"
				/>
			</svg>
		{/if}
		<span class="flex-grow">
			{notification.message}
		</span>

		<button on:click={() => (notification.show = false)}>
			<svg class="w-8 h-8" viewBox="0 0 24 24" fill="none">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke="currentColor"
					d="m5.5 5.5 13 13m-13 0 13-13"
				/>
			</svg>
		</button>
	</div>
{/if}

<section id="contact" class="mt-32 xl:mt-48 px-4 sm:px-0 sm:w-[600px] sm:mx-auto">
	<h1 class="text-2xl xl:text-3xl font-semibold text-gray-950 dark:text-slate-200">
		{$currentTranslations.contactMeTitle}
	</h1>

	<form
		class="
			mt-8 grid grid-rows-[repeat(4,min-content)] md:grid-rows-[repeat(3,min-content)] md:grid-cols-2 gap-4 md:gap-6
			text-slate-800 dark:text-slate-300
			[&_span]:text-slate-500 [&_span]:font-medium
		"
		on:submit|preventDefault={() => sendEmail()}
	>
		<label for="name" class="w-full h-fit relative">
			<span
				class="
					absolute left-4 top-1/2 -translate-y-1/2 transition-all pointer-events-none
				"
				class:active={inputsValues.name.length}>{$currentTranslations.contactMeName}</span
			>
			<input
				bind:value={inputsValues.name}
				name="name"
				id="name"
				type="text"
				class="w-full h-12 rounded-md px-4 bg-white dark:bg-slate-900"
				required
				minlength="2"
			/>
		</label>

		<label for="email" class="w-full h-fit relative">
			<span
				class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-700 transition-all pointer-events-none"
				class:active={inputsValues.email.length}>Email</span
			>
			<input
				bind:value={inputsValues.email}
				name="email"
				id="email"
				type="email"
				class="w-full h-12 rounded-md px-4 bg-white dark:bg-slate-900"
				required
			/>
		</label>

		<label for="message" class="w-full h-fit relative md:col-[1/3]">
			<span
				class="absolute left-4 top-6 -translate-y-1/2 text-slate-700 transition-all pointer-events-none"
				class:active={inputsValues.message.length > 0}>{$currentTranslations.contactMeMessage}</span
			>
			<textarea
				bind:value={inputsValues.message}
				name="message"
				id="message"
				rows="5"
				class="w-full min-h-[10rem] p-4 rounded-md bg-white dark:bg-slate-900"
				required
				minlength="2"
				maxlength="5000"
			/>
		</label>

		<button
			class="
				w-full rounded-md h-10 flex items-center justify-center gap-x-2 bg-sky-300
				sm:w-fit sm:px-8 text-slate-800 font-medium disabled:bg-sky-200
			"
			type="submit"
			aria-label="Send email"
			disabled={sending}
		>
			{$currentTranslations.contactMeSend}
			{#if sending == false}
				<svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke-width="1.5">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke="currentColor"
						d="M19.5 12L4.5 5.5L9.5 12L4.5 18.5L19.5 12Z"
					/>
				</svg>
			{:else if sending == true}
				<div
					class="w-4 h-4 p-1 rounded-full border-slate-800 border-b-transparent border-2 animate-spin"
				/>
			{/if}
		</button>
	</form>
</section>

<style lang="postcss">
	label:focus-within span,
	.active {
		@apply text-sm;
		transform: translateY(-135%);
	}
</style>
