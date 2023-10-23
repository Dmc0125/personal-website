import { Rule } from 'sanity';

export default {
	name: 'project',
	type: 'document',
	fields: [
		{
			name: 'isWebsite',
			type: 'boolean',
			validation: (Rule: Rule) => Rule.required(),
		},
		{
			name: 'isFinished',
			type: 'boolean',
			validation: (Rule: Rule) => Rule.required(),
		},
		{
			name: 'title',
			type: 'string',
			validation: (Rule: Rule) => Rule.required(),
		},
		{
			name: 'description',
			type: 'text',
			validation: (Rule: Rule) => Rule.required(),
		},
		{
			name: 'imgBgClr',
			type: 'string',
		},
		{
			name: 'img',
			type: 'image',
		},
		{
			name: 'websiteUrl',
			type: 'url',
		},
		{
			name: 'githubOwner',
			type: 'string',
			validation: (Rule: Rule) => Rule.required(),
		},
		{
			name: 'githubRepo',
			type: 'string',
			validation: (Rule: Rule) => Rule.required(),
		},
		{
			name: 'tags',
			type: 'array',
			of: [{ type: 'string' }],
			validation: (Rule: Rule) => Rule.required(),
		},
	],
};
