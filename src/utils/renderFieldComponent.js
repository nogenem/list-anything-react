import React from "react";

import * as fieldTypes from "../constants/fieldTypes";

import UrlInputImgField from "../components/fields/UrlInputImgField";
import TextareaField from "../components/fields/TextareaField";
import UrlInputField from "../components/fields/UrlInputField";

import SimpleInputField from "../components/fields/SimpleInputField";

export default fieldData => {
  const { field } = fieldData;
  switch (field.field_type) {
    case fieldTypes.TEXT_INPUT:
      return <SimpleInputField {...fieldData} />;
    case fieldTypes.URL_INPUT_IMG:
      return <UrlInputImgField {...fieldData} />;
    case fieldTypes.NUMBER_INPUT:
      return <SimpleInputField {...fieldData} type="number" />;
    case fieldTypes.TEXTAREA:
      return <TextareaField {...fieldData} />;
    case fieldTypes.URL_INPUT:
      return <UrlInputField {...fieldData} />;
    case fieldTypes.DATE_INPUT:
      return <SimpleInputField {...fieldData} type="date" />;
    default:
      return <div key={field._id} />;
  }
};
