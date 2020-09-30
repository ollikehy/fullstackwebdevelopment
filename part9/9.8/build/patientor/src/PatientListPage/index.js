"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const axios_1 = __importDefault(require("axios"));
const semantic_ui_react_1 = require("semantic-ui-react");
const AddPatientModal_1 = __importDefault(require("../AddPatientModal"));
const constants_1 = require("../constants");
const HealthRatingBar_1 = __importDefault(require("../components/HealthRatingBar"));
const state_1 = require("../state");
const PatientListPage = () => {
    const [{ patients }, dispatch] = state_1.useStateValue();
    const [modalOpen, setModalOpen] = react_1.default.useState(false);
    const [error, setError] = react_1.default.useState();
    const openModal = () => setModalOpen(true);
    const closeModal = () => {
        setModalOpen(false);
        setError(undefined);
    };
    const submitNewPatient = (values) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { data: newPatient } = yield axios_1.default.post(`${constants_1.apiBaseUrl}/patients`, values);
            dispatch({ type: "ADD_PATIENT", payload: newPatient });
            closeModal();
        }
        catch (e) {
            console.error(e.response.data);
            setError(e.response.data.error);
        }
    });
    return (<div className="App">
      <semantic_ui_react_1.Container textAlign="center">
        <h3>Patient list</h3>
      </semantic_ui_react_1.Container>
      <semantic_ui_react_1.Table celled>
        <semantic_ui_react_1.Table.Header>
          <semantic_ui_react_1.Table.Row>
            <semantic_ui_react_1.Table.HeaderCell>Name</semantic_ui_react_1.Table.HeaderCell>
            <semantic_ui_react_1.Table.HeaderCell>Gender</semantic_ui_react_1.Table.HeaderCell>
            <semantic_ui_react_1.Table.HeaderCell>Occupation</semantic_ui_react_1.Table.HeaderCell>
            <semantic_ui_react_1.Table.HeaderCell>Health Rating</semantic_ui_react_1.Table.HeaderCell>
          </semantic_ui_react_1.Table.Row>
        </semantic_ui_react_1.Table.Header>
        <semantic_ui_react_1.Table.Body>
          {Object.values(patients).map((patient) => (<semantic_ui_react_1.Table.Row key={patient.id}>
              <semantic_ui_react_1.Table.Cell>{patient.name}</semantic_ui_react_1.Table.Cell>
              <semantic_ui_react_1.Table.Cell>{patient.gender}</semantic_ui_react_1.Table.Cell>
              <semantic_ui_react_1.Table.Cell>{patient.occupation}</semantic_ui_react_1.Table.Cell>
              <semantic_ui_react_1.Table.Cell>
                <HealthRatingBar_1.default showText={false} rating={1}/>
              </semantic_ui_react_1.Table.Cell>
            </semantic_ui_react_1.Table.Row>))}
        </semantic_ui_react_1.Table.Body>
      </semantic_ui_react_1.Table>
      <AddPatientModal_1.default modalOpen={modalOpen} onSubmit={submitNewPatient} error={error} onClose={closeModal}/>
      <semantic_ui_react_1.Button onClick={() => openModal()}>Add New Patient</semantic_ui_react_1.Button>
    </div>);
};
exports.default = PatientListPage;
