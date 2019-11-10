import { Router } from 'express';
import facets from './facets';
import BasicBlock from '../models/BasicBlock';
import axios from "axios";
import RawBlock from "../models/RawBlock";

const BLOCKS_OVERVIEW_ENDPOINT = "https://blockchain.info/blocks?format=json"
const RAW_BLOCK_ENDPOINT = "https://blockchain.info/rawblock/"

export default ({ config, db }) => {
	let api = Router();

	// mount the facets resource
	api.use('/facets', facets({ config, db }));

	api.get('/', (req, res) => {
        return axios.get(BLOCKS_OVERVIEW_ENDPOINT)
            .then(function (response) {
                const blocks = response.data.blocks.map(block => new BasicBlock(block));
                res.json({ blocks });

            })
            .catch(function (error) {
                res.json({ error : {
                        status: 500,
                        text: "could not get blocks",
                        error
                    }
                });
            })
	});

	api.get('/block/:hash', (req, res) => {
        const hash = req.params.hash;

        return axios.get(RAW_BLOCK_ENDPOINT + hash)
            .then(function (response) {
                const block = new RawBlock(response.data)
                res.json({ block });
            })
            .catch(function (error) {
                res.json({ error : {
                        status: 500,
                        text: `could not get block with hash ${hash}`,
                    error
                    }
                });
            })
	});

	return api;
}
