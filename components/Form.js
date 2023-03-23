import { APIClient, Openlaw } from "openlaw";
import OpenLawForm from "openlaw-elements";
import { useEffect, useLayoutEffect, useState } from "react";
import { convertTemplateToHTML } from "../utility/toHTML";
import "openlaw-elements/dist/openlaw-elements.min.css";

const apiClient = new APIClient("https://lib.openlaw.io/api/v1/default");

const ContractForm = ({ template, stateLift }) => {
  // console.log("form rerender");
  const [params, setParams] = useState({});
  const { compiledTemplate } = Openlaw.compileTemplate(template);
  const { executionResult, errorMessage } = Openlaw.execute(
    compiledTemplate,
    {},
    {}
  );
  const variables = Openlaw.getExecutedVariables(executionResult, {});
  //console.log(JSON.stringify(params));

  function onChangeFunction(key, value, validationData) {
    setParams({ ...params, [key]: value });
    stateLift(key, value, validationData);
  }

  return (
    <>
      <OpenLawForm
        apiClient={apiClient}
        executionResult={executionResult}
        parameters={params}
        onChangeFunction={onChangeFunction}
        openLaw={Openlaw}
        variables={variables}
      />
    </>
  );
};

export default ContractForm;
