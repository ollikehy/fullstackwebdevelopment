"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const validation_1 = __importDefault(require("../utils/validation"));
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.send(patientService_1.default.getCensoredPatients());
});
router.post('/', (req, res) => {
    const newPatient = validation_1.default.toNewPatient(req.body);
    const addedPatient = patientService_1.default.addPatient(newPatient);
    res.status(200).send(addedPatient);
});
exports.default = router;
