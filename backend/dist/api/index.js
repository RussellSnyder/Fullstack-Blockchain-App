'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _facets = require('./facets');

var _facets2 = _interopRequireDefault(_facets);

var _BasicBlock = require('../models/BasicBlock');

var _BasicBlock2 = _interopRequireDefault(_BasicBlock);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _RawBlock = require('../models/RawBlock');

var _RawBlock2 = _interopRequireDefault(_RawBlock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BLOCKS_OVERVIEW_ENDPOINT = "https://blockchain.info/blocks?format=json";
var RAW_BLOCK_ENDPOINT = "https://blockchain.info/rawblock/";

exports.default = function (_ref) {
    var config = _ref.config,
        db = _ref.db;

    var api = (0, _express.Router)();

    // mount the facets resource
    api.use('/facets', (0, _facets2.default)({ config: config, db: db }));

    api.get('/', function (req, res) {
        return _axios2.default.get(BLOCKS_OVERVIEW_ENDPOINT).then(function (response) {
            var blocks = response.data.blocks.map(function (block) {
                return new _BasicBlock2.default(block);
            });
            res.json({ blocks: blocks });
        }).catch(function (error) {
            res.json({ error: {
                    status: 500,
                    text: "could not get blocks",
                    error: error
                }
            });
        });
    });

    api.get('/block/:hash', function (req, res) {
        var hash = req.params.hash;

        return _axios2.default.get(RAW_BLOCK_ENDPOINT + hash).then(function (response) {
            var block = new _RawBlock2.default(response.data);
            res.json({ block: block });
        }).catch(function (error) {
            res.json({ error: {
                    status: 500,
                    text: 'could not get block with hash ' + hash,
                    error: error
                }
            });
        });
    });

    return api;
};
//# sourceMappingURL=index.js.map