import type {
  CreateAccountInput,
} from "@paymark/validations";
import { AccountType } from '@paymark/types';

export class CreateAccountDto
  implements CreateAccountInput
{
  name: string;
  type: AccountType;
}