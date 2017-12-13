import React from "react";

import * as fieldTypes from "../constants/fieldTypes";

import TextInputField from "../components/fields/TextInputField";
import UrlInputImgField from "../components/fields/UrlInputImgField";
import NumberInputField from "../components/fields/NumberInputField";
import TextareaField from "../components/fields/TextareaField";
import UrlInputField from "../components/fields/UrlInputField";
import DateInputField from "../components/fields/DateInputField";

export default fieldData => {
  const { field } = fieldData;
  switch (field.field_type) {
    case fieldTypes.TEXT_INPUT:
      return <TextInputField {...fieldData} />;
    case fieldTypes.URL_INPUT_IMG:
      return <UrlInputImgField {...fieldData} />;
    case fieldTypes.NUMBER_INPUT:
      return <NumberInputField {...fieldData} />;
    case fieldTypes.TEXTAREA:
      return <TextareaField {...fieldData} />;
    case fieldTypes.URL_INPUT:
      return <UrlInputField {...fieldData} />;
    case fieldTypes.DATE_INPUT:
      return <DateInputField {...fieldData} />;
    default:
      return <div key={field._id} />;
  }
};
