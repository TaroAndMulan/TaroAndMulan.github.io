import { APIClient, Openlaw } from "openlaw";
import OpenLawForm from "openlaw-elements";
import { useEffect, useLayoutEffect, useState } from "react";
import { convertTemplateToHTML } from "../utility/toHTML";
import "openlaw-elements/dist/openlaw-elements.min.css";

const apiClient = new APIClient("https://lib.openlaw.io/api/v1/default");
//apiClient.login("simbadinosour@gmail.com", "Openlaw129");

const Preview = ({ template, formData }) => {
  const { compiledTemplate } = Openlaw.compileTemplate(template);
  const { executionResult, errorMessage } = Openlaw.execute(
    compiledTemplate,
    {},
    formData
  );
  const variables = Openlaw.getExecutedVariables(executionResult, {});
  const { agreement } = Openlaw.getAgreements(executionResult)[0];
  const txt = Openlaw.renderForPreview(agreement, {}, {});
  return (
    <div dangerouslySetInnerHTML={{ __html: convertTemplateToHTML(txt) }} />
  );
};

export default Preview;
