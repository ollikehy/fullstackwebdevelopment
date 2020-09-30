"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const semantic_ui_react_1 = require("semantic-ui-react");
const AddPatientForm_1 = __importDefault(require("./AddPatientForm"));
const AddPatientModal = ({ modalOpen, onClose, onSubmit, error }) => (<semantic_ui_react_1.Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <semantic_ui_react_1.Modal.Header>Add a new patient</semantic_ui_react_1.Modal.Header>
    <semantic_ui_react_1.Modal.Content>
      {error && <semantic_ui_react_1.Segment inverted color="red">{`Error: ${error}`}</semantic_ui_react_1.Segment>}
      <AddPatientForm_1.default onSubmit={onSubmit} onCancel={onClose}/>
    </semantic_ui_react_1.Modal.Content>
  </semantic_ui_react_1.Modal>);
exports.default = AddPatientModal;
