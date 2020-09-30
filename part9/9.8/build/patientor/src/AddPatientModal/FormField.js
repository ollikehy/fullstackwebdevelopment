"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiagnosisSelection = exports.NumberField = exports.TextField = exports.SelectField = void 0;
const react_1 = __importDefault(require("react"));
const formik_1 = require("formik");
const semantic_ui_react_1 = require("semantic-ui-react");
exports.SelectField = ({ name, label, options }) => (<semantic_ui_react_1.Form.Field>
    <label>{label}</label>
    <formik_1.Field as="select" name={name} className="ui dropdown">
      {options.map(option => (<option key={option.value} value={option.value}>
          {option.label || option.value}
        </option>))}
    </formik_1.Field>
  </semantic_ui_react_1.Form.Field>);
exports.TextField = ({ field, label, placeholder }) => (<semantic_ui_react_1.Form.Field>
    <label>{label}</label>
    <formik_1.Field placeholder={placeholder} {...field}/>
    <div style={{ color: 'red' }}>
      <formik_1.ErrorMessage name={field.name}/>
    </div>
  </semantic_ui_react_1.Form.Field>);
exports.NumberField = ({ field, label, min, max }) => (<semantic_ui_react_1.Form.Field>
    <label>{label}</label>
    <formik_1.Field {...field} type='number' min={min} max={max}/>

    <div style={{ color: 'red' }}>
      <formik_1.ErrorMessage name={field.name}/>
    </div>
  </semantic_ui_react_1.Form.Field>);
exports.DiagnosisSelection = ({ diagnoses, setFieldValue, setFieldTouched }) => {
    const field = "diagnosisCodes";
    const onChange = (_event, data) => {
        setFieldTouched(field, true);
        setFieldValue(field, data.value);
    };
    const stateOptions = diagnoses.map(diagnosis => ({
        key: diagnosis.code,
        text: `${diagnosis.name} (${diagnosis.code})`,
        value: diagnosis.code
    }));
    return (<semantic_ui_react_1.Form.Field>
      <label>Diagnoses</label>
      <semantic_ui_react_1.Dropdown fluid multiple search selection options={stateOptions} onChange={onChange}/>
      <formik_1.ErrorMessage name={field}/>
    </semantic_ui_react_1.Form.Field>);
};
