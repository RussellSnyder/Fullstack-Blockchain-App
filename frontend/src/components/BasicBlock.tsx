import * as React from "react";
import moment from "moment";
import {Link} from "react-router-dom";

export interface BasicBlockProps {
    height: number;
    hash: string;
    time: Date;
    main_chain: boolean;
}

export function BasicBlock({height, hash, time, main_chain}: BasicBlockProps) {
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title text-break">Hash: {hash}</h5>
                <div className="row card-text">
                    <div className="col-sm-6">
                        <ul className="list-unstyled">
                            <li>channel: {main_chain ? 'main channel' : 'another channel'}</li>
                            <li>height: {height}</li>
                        </ul>
                    </div>
                    <div className="col-sm-6">
                        <i className="fas fa-clock"/> {moment(time).format('D.MM.YYYY, hh:mm:ss')}
                    </div>
                </div>
                <Link to={`/block/${hash}`} className="card-link col-12 btn btn-outline-primary">More info<i
                    className="fas fa-info-circle ml-2"/></Link>
            </div>
        </div>
    )
}
