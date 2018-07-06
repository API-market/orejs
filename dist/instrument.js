var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var APIM_CONTRACT_NAME = 'manager.apim';
var INSTR_CONTRACT_NAME = 'instr.ore';
var INSTR_USAGE_CONTRACT_NAME = 'usagelog.ore';
var INSTR_TABLE_NAME = 'tokens';
var LOG_TABLE_NAME = 'callcount';
var ONE_YEAR = 365 * 24 * 60 * 60 * 1000;
/* Private */
function getAllInstruments(oreAccountName, additionalFilters) {
    if (additionalFilters === void 0) { additionalFilters = []; }
    return __awaiter(this, void 0, void 0, function () {
        var rows;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    additionalFilters.push({ owner: oreAccountName });
                    return [4 /*yield*/, this.getAllTableRowsFiltered({
                            code: INSTR_CONTRACT_NAME,
                            table: INSTR_TABLE_NAME,
                        }, additionalFilters)];
                case 1:
                    rows = _a.sent();
                    return [2 /*return*/, rows];
            }
        });
    });
}
function getRight(instrument, rightName) {
    var rights = instrument["instrument"]["rights"];
    for (var i = 0; i < rights.length; i++) {
        var right = rights[i];
        if (right["right_name"] === rightName) {
            return right;
        }
    }
}
function isActive(instrument) {
    var startTime = instrument["instrument"]["start_time"];
    var endTime = instrument["instrument"]["end_time"];
    var currentTime = Math.floor(Date.now() / 1000);
    return (currentTime > startTime && currentTime < endTime);
}
/* Public */
function getInstruments(oreAccountName, category, filters) {
    if (category === void 0) { category = undefined; }
    if (filters === void 0) { filters = []; }
    return __awaiter(this, void 0, void 0, function () {
        var rows;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (category) {
                        filters.push(function (row) {
                            return row["instrument"]["instrument_class"] === category;
                        });
                    }
                    return [4 /*yield*/, getAllInstruments.bind(this)(oreAccountName, filters)];
                case 1:
                    rows = _a.sent();
                    return [2 /*return*/, rows];
            }
        });
    });
}
function findInstruments(oreAccountName, activeOnly, category, rightName) {
    if (activeOnly === void 0) { activeOnly = true; }
    if (category === void 0) { category = undefined; }
    if (rightName === void 0) { rightName = undefined; }
    return __awaiter(this, void 0, void 0, function () {
        var filters, rows;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    filters = [];
                    if (activeOnly) {
                        filters.push(function (row) {
                            return isActive(row);
                        });
                    }
                    if (rightName) {
                        filters.push(function (row) {
                            return getRight(row, rightName);
                        });
                    }
                    return [4 /*yield*/, getInstruments.bind(this)(oreAccountName, category, filters)];
                case 1:
                    rows = _a.sent();
                    return [2 /*return*/, rows];
            }
        });
    });
}
function createInstrument(instrumentCreatorAccountName, instrumentOwnerAccountName, instrumentData) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, contract, options, instrument;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, this.contract(INSTR_CONTRACT_NAME, instrumentCreatorAccountName)];
                case 1:
                    _a = _b.sent(), contract = _a.contract, options = _a.options;
                    return [4 /*yield*/, contract.mint({ "minter": instrumentCreatorAccountName, "owner": instrumentOwnerAccountName, "instrument": instrumentData }, options)];
                case 2:
                    instrument = _b.sent();
                    return [2 /*return*/, instrument];
            }
        });
    });
}
function getApiCallStats(instrumentId, rightName) {
    return __awaiter(this, void 0, void 0, function () {
        var result, i, rightProprties;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, this.eos.getAllTableRows({
                        code: INSTR_USAGE_CONTRACT_NAME,
                        table: LOG_TABLE_NAME,
                        scope: instrumentId // new scoping
                    })];
                case 1:
                    result = _a.sent();
                    for (i = 0; i < result.rows.length; i++) {
                        if (result.rows[i]["right_name"] === rightName) {
                            rightProprties = { "totalCalls": calls[i]["total_count"], "totalCpuUsage": calls[i]["total_cpu"] };
                            return [2 /*return*/, rightProprties];
                        }
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function createOfferInstrument(oreAccountName, offerInstrumentData) {
    return __awaiter(this, void 0, void 0, function () {
        var options, contract, instrument;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    options = { authorization: oreAccountName + "@owner" };
                    return [4 /*yield*/, this.eos.contract(APIM_CONTRACT_NAME, options)];
                case 1:
                    contract = _a.sent();
                    return [4 /*yield*/, contract.publishapi(oreAccountName, offerInstrumentData.issuer, offerInstrumentData.api_name, offerInstrumentData.additional_api_params, offerInstrumentData.api_payment_model, offerInstrumentData.api_price_in_cpu, offerInstrumentData.license_price_in_cpu, offerInstrumentData.api_description, offerInstrumentData.right_registry, offerInstrumentData.start_time, offerInstrumentData.end_time, options)];
                case 2:
                    instrument = _a.sent();
                    return [2 /*return*/, instrument];
            }
        });
    });
}
function createVoucherInstrument(oreAccountName, buyer, offerId) {
    return __awaiter(this, void 0, void 0, function () {
        var options, contract, instrument;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    options = { authorization: oreAccountName + "@owner" };
                    return [4 /*yield*/, this.eos.contract(APIM_CONTRACT_NAME, options)];
                case 1:
                    contract = _a.sent();
                    return [4 /*yield*/, contract.licenseapi(oreAccountName, buyer, offerId, options)];
                case 2:
                    instrument = _a.sent();
                    return [2 /*return*/, instrument];
            }
        });
    });
}
module.exports = {
    findInstruments: findInstruments,
    getInstruments: getInstruments,
    getApiCallStats: getApiCallStats,
    createInstrument: createInstrument,
    createOfferInstrument: createOfferInstrument,
    createVoucherInstrument: createVoucherInstrument,
};
//# sourceMappingURL=instrument.js.map