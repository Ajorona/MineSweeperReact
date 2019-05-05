import React from 'react';
import classes from './Modal.css';

import Spinner from '../Spinner/Spinner';
import Aux from '../../../hoc/Aux/Aux';

const Welcome = (props) => {
        return (
            <div>
                <form onSubmit={props.handleSubmit}>

                    <div className="row ml-4">
                        <div className="col-6">
                            <Spinner />
                        </div>

                        <div className="col-6 mt-3">
                            <div className="form-check">
                                <input className="form-check-input" onChange={props.initializeGame} type="radio" name="level"  value="Beginner" />
                                <label className="form-check-label" for="lvlOne">
                                    Beginner
                                </ label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" onChange={props.initializeGame} type="radio" name="level" value="Intermediate" />
                                <label className="form-check-label" for="lvlTwo">
                                    Intermediate
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" onChange={props.initializeGame} type="radio" name="level" value="Expert" />
                                <label className="form-check-label" for="lvlThree">
                                    Expert
                                </label>
                            </div>
                    </div>
                </div>
                <div className="row ml-5 mt-2">
                    <button className='btn btn-primary mx-auto'>Lets Go!</button>
                </div>
            </form>
        </div>
        );
}


export default Welcome;
