import { IErrorMsg } from "src/app/components/error-msg/error-msg.component";

export const validations: IErrorMsg = {
  query: [
    {
      type: "maxlength",
      message: "Search cannot contain more than 50 characters"
    }
  ]
};
