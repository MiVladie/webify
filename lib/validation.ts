import { IRule, TLongRuleExpression, IValues } from '@/interfaces/validation';

const getRule = (rules: IRule, name: keyof IRule) => {
	let result;
	let message;

	if ((rules[name] as TLongRuleExpression<any>)?.value !== undefined) {
		result = (rules[name] as TLongRuleExpression<any>).value;
		message = (rules[name] as TLongRuleExpression<any>).message;
	} else {
		result = rules[name];

		const validationErrors = {
			required: 'This field is required!',
			isEmail: 'This is not a valid email address!',
			isPassword: 'The password must be between 8 and 15 characters long!',
			isPhone: 'This is not a valid phone number!',
			matchField: 'Fields do not match!',
			differValue: 'Field must not be the same!',
			custom: 'Invalid value!'
		};

		message = validationErrors[name]!;
	}

	return { result, message };
};

export const validateField = async <T extends IValues>(
	value: string,
	rules: IRule,
	fields?: T
): Promise<string | false> => {
	let name: keyof IRule;

	for (name in rules) {
		const { result, message } = getRule(rules, name);

		switch (name) {
			case 'required':
				if (result && isEmpty(value)) return message;
				break;

			case 'isEmail':
				if (result && !isValidEmail(value)) return message;
				break;

			case 'isPhone':
				if (result && !isValidPhone(value)) return message;
				break;

			case 'isPassword':
				if (result && !isValidPassword(value)) return message;
				break;

			case 'matchField':
				if (fields && !areSameValues(value, fields[result])) return message;
				break;

			case 'differValue':
				if (areSameValues(value, result)) return message;
				break;

			case 'custom':
				if (typeof result === 'function') {
					let res = await result(value);
					if (res) return res || message;
				}
				break;

			default:
				break;
		}
	}

	return false;
};

export const isValidEmail = (value: string): boolean => {
	var re =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	return re.test(String(value).toLowerCase());
};

export const isValidPhone = (value: string): boolean => {
	var re = /^\+?([0-9 ]{5,15})$/;

	return re.test(String(value).toLowerCase());
};

export const isValidPassword = (value: string): boolean => {
	return value.length >= 8 && value.length <= 15;
};

export const areSameValues = (a: string, b: string): boolean => {
	return a === b;
};

export const isEmpty = (value: string | number): boolean => {
	return value == null || value === '' || (typeof value === 'string' ? value.trim() === '' : false);
};
