import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, FormControl} from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Button from 'react-bootstrap/Button';
import ControlLabel from 'react-bootstrap/FormControl';
import Checkbox from 'react-bootstrap/FormCheck';

class Filter extends Component {
    state = {
      name: '',
      exactMatch: false,
    };
  
    changeFilterByName = (event) => {
      this.setState({
        name: event.target.value,
      });
    }
  
    reset = () => {
      if (this.state.name.trim()) {
        this.setState({ name: '' });
        this.props.onReset();
      }
    }
  
    submit = (event) => {
      event.preventDefault();
      if (this.state.name.trim()) {
        this.props.onApply();
      }
    }
  
    changeExactMatchFlag = (event) => {
      this.setState({ exactMatch: event.target.checked })
    }
  
    render() {
      return (
        <Card collapsible className="Filters" bsStyle="primary" header="Filters">
          <form onSubmit={this.submit}>
            <div className="row">
              <div className="col-md-4">
                <FormGroup controlId="filterByName">
                  <ControlLabel>Name</ControlLabel>
                  <FormControl type="text"
                               value={this.state.name}
                               onChange={this.changeFilterByName}/>
                  {!this.state.exactMatch}
                </FormGroup>
                <Checkbox checked={this.state.exactMatch}
                          onChange={this.changeExactMatchFlag}>
                  Match the specified full name (e.g. Spider-Man).
                </Checkbox>
              </div>
            </div>
            <ButtonToolbar>
              <Button type="reset" onClick={this.reset}>RESET</Button>
              <Button type="submit" bsStyle="primary">APPLY</Button>
            </ButtonToolbar>
          </form>
        </Card>
      );
    }
  }
  
  Filter.propTypes = {
    onApply: PropTypes.func,
    onReset: PropTypes.func,
  };
  
  Filter.defaultProps = {
    onApply: () => { },
    onReset: () => { },
  };
  
  
  export default Filter;
  