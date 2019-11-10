import * as React from "react";
import {useEffect, useState} from "react";
import moment from "moment";
import {Link, withRouter} from "react-router-dom";
import axios from "axios";
import {BasicBlockProps} from "./BasicBlock";

export interface RawBlockProps extends BasicBlockProps {
    setIsDataLoadedHandler: Function
    ver: string;
    next_block: string
    bits: string
    fee: string
    nonce: string
    n_tx: string
    size: string
    block_index: string
    weight: string
    tx_length: number
    tx_data: Array<any>;
    prev_block: string
    mrkl_root: string
}

const Loading = () => (
    <div className="row">
        <div className="col-12 py-4">
            <h1 className="text-center">Loading Block Data...</h1>
        </div>
        <div className="col-12 py-4 text-center">
            <div className="spinner-border" role="status" style={{width: '5rem', height: '5rem'}}>
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    </div>
)

const DataDisplay = ({
                         height, hash, time, main_chain, next_block, prev_block, setIsDataLoadedHandler, ver, bits, fee, nonce, weight, tx_length, mrkl_root
                     }: RawBlockProps) => (
    <>
        <h2 className="text-break text-center">Hash {hash}</h2>
        <div className="row">
            <div className="col-sm-6">
                <ul className="list-unstyled">
                    <li>channel: {main_chain ? 'main channel' : 'another channel'}</li>
                    <li>height: {height}</li>
                    <li>ver: {ver}</li>
                    <li>bits: {bits}</li>
                    <li>nonce: {nonce}</li>
                    <li>weight: {weight}</li>
                    <li>tx length: {tx_length}</li>
                    <li className="text-break">mrkl_root: {mrkl_root}</li>
                </ul>
            </div>
            <div className="col-sm-6">
                <ul className="list-unstyled">
                    <li>
                        <i className="fas fa-clock mr-2"/> {moment(time).format('D.MM.YYYY, hh:mm:ss')}
                    </li>
                    <li>
                        <i className="fas fa-dollar-sign mr-2"/> {fee}
                    </li>
                </ul>
            </div>
        </div>
        <div className="row">
            {prev_block && <Link onClick={() => setIsDataLoadedHandler() as any} to={`/block/${prev_block}`}
                  className="col-5 btn btn-outline-primary">
                <i className="fas fa-arrow-left mr-3"/>
                Previous Block
            </Link>}
            {next_block && <Link onClick={() => setIsDataLoadedHandler() as any} to={`/block/${next_block}`}
                  className="col-5 offset-2 btn btn-outline-primary">
                Next Block
                <i className="fas fa-arrow-right ml-3"/>
            </Link>}
        </div>
    </>
)

const RawBlock = (props: any) => {
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [data, setData] = useState();
    const [errorText, setErrorText] = useState('');

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        if (isDataLoaded) return
        const {id} = props.match.params;
        axios.get(`/block/${id}`)
            .then(res => {
                if (!res.data.block) throw Error()
                setData(res.data.block)
                setIsDataLoaded(true)
            }).catch(res => {
            setErrorText(res.error.text)
        })
    });

    return (
        <div className="container">
            <div className="row">
                <Link to={`/`} className="col-5 btn btn-primary"><i className="fas fa-arrow-left mr-3"/> Back To
                    Home</Link>
            </div>

            {errorText.length > 0 && errorText}
            {!isDataLoaded && errorText.length < 1 && <Loading/>}
            {isDataLoaded && <DataDisplay {...data} setIsDataLoadedHandler={() => setIsDataLoaded(false)}/>}
        </div>
    )
}

export default withRouter(RawBlock)
