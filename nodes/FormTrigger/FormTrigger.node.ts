import {
	IWebhookFunctions,
} from 'n8n-core';

import {
	IDataObject,
	INodeType,
	INodeTypeDescription,
	IWebhookResponseData,
} from 'n8n-workflow';

import { fieldRegistry, getFieldOptions, FieldType } from '../../@fields/field-registry';

export class FormTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Form Trigger',
		name: 'formTrigger',
		icon: 'file:webhook.svg',
		group: ['trigger'],
		version: 1,
		description: 'Starts a workflow when Form events occur',
		defaults: {
			name: 'Form Trigger',
		},
		inputs: [],
		outputs: ['main'],
		webhooks: [
			{
				name: 'displayForm',
				httpMethod: 'GET',
				responseMode: 'onReceived',
				path: '={{$parameter.path}}',
				isFullPath: true,
			},
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'onReceived',
				path: '={{$parameter.path}}',
				isFullPath: true,
			},
		],
		properties: [
			{
				displayName: 'Path',
				name: 'path',
				type: 'string',
				default: 'forms/my-form',
				placeholder: 'webhook',
				required: true,
			},
			{
				displayName: 'Page Title',
				type: 'string',
				default: 'Test Form',
				name: 'pageTitle',
			},
			{
				displayName: 'Page Description',
				type: 'string',
				default: 'Fill out the form below and we will get back to you.',
				name: 'pageDescription',
			},
			{
				displayName: 'Form Type',
				name: 'formType',
				type: 'options',
				options: [
					{
						name: 'Custom Form HTML',
						value: 'customHTML',
						description: 'Use your own HTML for the form body',
					},
					{
						name: 'Form Builder',
						value: 'formBuilder',
						description: 'Use a simple form builder',
					},
				],
				default: 'formBuilder',
			},
			{
				displayName: 'Form HTML',
				name: 'formHTML',
				description: 'HTML to use for your form body',
				type: 'string',
				typeOptions: {
					alwaysOpenEditWindow: true,
				},
				default: '',
				displayOptions: {
					show: {
						formType: [
							'customHTML',
						],
					},
				},
			},
			{
				displayName: 'Form Design',
				name: 'formType',
				type: 'options',
				options: [
					{
						name: 'Modern',
						value: 'modernHtml',
						description: 'Use The Modern Theme',
					},
					{
						name: 'Simple',
						value: 'formBuilder',
						description: 'Simple Form',
					},
					{
						name: 'Animated',
						value: 'formBuilder',
						description: 'Simple Form',
					},
				],
				default: 'formBuilder',
			},
			{
				displayName: 'Fields',
				name: 'fields',
				placeholder: 'Add Fields',
				description: 'Form Fields',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
					sortable: true,
				},
				displayOptions: {
					show: {
						formType: [
							'formBuilder',
						],
					},
				},
				default: {},
				options: [
					{
						name: 'item',
						displayName: 'Field',
						values: [
							{
								displayName: 'Field Type',
								name: 'fieldType',
								type: 'options',
								options: getFieldOptions(),
								default: 'short-text',
							},
							{
								displayName: 'Label',
								name: 'label',
								type: 'string',
								default: '',
								description: 'Label for the field',
							},
							{
								displayName: 'Name',
								name: 'name',
								type: 'string',
								default: '',
								description: 'Technical name for the field',
							},
							{
								displayName: 'Required',
								name: 'required',
								type: 'boolean',
								default: false,
							},
							{
								displayName: 'Field Options',
								name: 'fieldOptions',
								type: 'collection',
								default: {},
								options: [
									// This will be dynamically populated based on field type
									// We'll handle this in the webhook method
								],
							},
						],
					},
				],
			},
			// Optional Settings
			{
				displayName: 'Options',
				type: 'collection',
				name: 'options',
				default: {},
				options: [
					{
						displayName: 'Bootstrap URL',
						name: 'bootstrap',
						default: 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css',
						type: 'string',
						description: 'URL for Bootstrap CSS',
					},
					{
						displayName: 'CSS File',
						name: 'cssFile',
						default: 'https://joffcom.github.io/style.css',
						type: 'string',
						description: 'URL for custom CSS, For an example see "https://joffcom.github.io/style.css"',
					},
					{
						displayName: 'Form ID',
						name: 'formId',
						default: 'n8n-form',
						type: 'string',
						description: 'Form ID to use',
					},
					{
						displayName: 'Form Name',
						name: 'formName',
						default: 'n8n-form',
						type: 'string',
						description: 'Form Name to use',
					},
					{
						displayName: 'Javascript',
						name: 'javascript',
						default: `$(document).on('submit','#n8n-form',function(e){
	$.post('#', $('#n8n-form').serialize(), function(result) {
		var resp = jQuery.parseJSON(result);
		if (resp.status === 'ok') {
			$("#status").attr('class', 'alert alert-success');
			$("#status").show();
			$('#status-text').text('Form has been submitted.');
		} else {
			$("#status").attr('class', 'alert alert-danger');
			$("#status").show();
			$('#status-text').text('Something went wrong.');
		}
	});
return false;
});`,
						type: 'string',
						typeOptions: {
							alwaysOpenEditWindow: true,
						},
						description: 'Javascript to use for form submission',
					},
					{
						displayName: 'jQuery',
						name: 'jQuery',
						default: 'https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js',
						type: 'string',
						description: 'URL for jQuery javascript',
					},
					{
						displayName: 'Submit Button Label',
						name: 'submitLabel',
						default: 'Submit',
						type: 'string',
						description: 'Text to use for the submit button',
					},
				],
			},
		],
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const webhookName = this.getWebhookName();

		if (webhookName === 'displayForm') {
			const options = this.getNodeParameter('options', 0) as IDataObject;
			const submitLabel = options.submitLabel ? options.submitLabel : 'Submit';
			const cssFile = options.cssFile ? options.cssFile : 'https://joffcom.github.io/style.css';
			const pageTitle = this.getNodeParameter('pageTitle', 0) as string;
			const pageDescription = this.getNodeParameter('pageDescription', 0) as string;
			const formType = this.getNodeParameter('formType', 0) as string;

			const fields = this.getNodeParameter('fields.item', []) as Array<{
				fieldType: FieldType;
				label: string;
				name: string;
				required: boolean;
				fieldOptions: Record<string, any>;
			}>;

			// Transform fields into their respective components
			const formFields = fields.map(field => {
				const FieldClass = fieldRegistry[field.fieldType];
				const schema = FieldClass.getSchema();
				
				return {
					...schema,
					...field,
					options: {
						...schema.options,
						...field.fieldOptions,
					},
				};
			});

			// Generate form HTML based on fields
			const formHtml = generateFormHtml(formFields);

			const defaultJS = `$(document).on('submit','#n8n-form',function(e){
	$.post('#', $('#n8n-form').serialize(), function(result) {
		var resp = jQuery.parseJSON(result);
		if (resp.status === 'ok') {
			$("#status").attr('class', 'alert alert-success');
			$("#status").show();
			$('#status-text').text('Form has been submitted.');
		} else {
		$("#status").attr('class', 'alert alert-danger');
		$("#status").show();
		$('#status-text').text('Something went wrong.');
		}
	});
	return false;
});`;

			const javascript = options.javascript ? options.javascript : defaultJS;
			const formName = options.formName ? options.formName : 'n8n-form';
			const formId = options.formId ? options.formId : 'n8n-form';
			const jQuery = options.jQuery ? options.jQuery : 'https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js';
			const bootstrapCss = options.bootstrap ? options.bootstrap : 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css';


			const res = this.getResponseObject();
			const testForm = `<html>
			<head>
				<title>${pageTitle}</title>
				<link rel="stylesheet" href="${bootstrapCss}" crossorigin="anonymous">
				<link rel="stylesheet" href="${cssFile}" crossorigin="anonymous">

				<script src="${jQuery}" type="text/javascript"></script>
				<script type="text/javascript">
					${javascript}
				</script>
				</head>
				<body>
					<div class="container">
						<div class="page">
						<div id="status" style="display: none" class="alert alert-danger">
            <p id="status-text" class="status-text"></p>
          </div>
							<div class="form">
								<h1>${pageTitle}</h1>
								<p>${pageDescription}</p>
								<form action='#' method='POST' name='${formName}' id='${formId}'>
									<div class="item">
										${formHtml}
									</div>
									<div class="btn-block">
										<button type="submit">${submitLabel}</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</body>
			</html>`;
			res.status(200).send(testForm).end();
			return {
				noWebhookResponse: true,
			};
		}

		const bodyData = this.getBodyData();

		return {
			webhookResponse: '{"status": "ok"}',
			workflowData: [
				this.helpers.returnJsonArray(bodyData),
			],
		};
	}
}

function generateFormHtml(fields: any[]): string {
	// This function will generate the HTML for each field type
	// We can create a separate file for this if it gets too complex
	return fields.map(field => {
		switch (field.type) {
			case 'short-text':
				return `
					<div class="form-group">
						<label for="${field.name}">${field.label}</label>
						<input type="text" 
							class="form-control" 
							id="${field.name}" 
							name="${field.name}"
							${field.required ? 'required' : ''}
							${field.options.placeholder ? `placeholder="${field.options.placeholder}"` : ''}
						/>
					</div>
				`;
			// Add cases for other field types
			default:
				return '';
		}
	}).join('\n');
}
