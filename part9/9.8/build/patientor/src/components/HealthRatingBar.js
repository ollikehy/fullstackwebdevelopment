"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const semantic_ui_react_1 = require("semantic-ui-react");
const HEALTHBAR_TEXTS = [
    'The patient is in great shape',
    'The patient has a low risk of getting sick',
    'The patient has a high risk of getting sick',
    'The patient has a diagnosed condition',
];
const HealthRatingBar = ({ rating, showText }) => {
    return (<div className="health-bar">
      {<semantic_ui_react_1.Rating icon="heart" disabled rating={4 - rating} maxRating={4}/>}
      {showText ? <p>{HEALTHBAR_TEXTS[rating]}</p> : null}
    </div>);
};
exports.default = HealthRatingBar;
