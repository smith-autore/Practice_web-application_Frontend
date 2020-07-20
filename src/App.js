import React, { Component } from 'react';
import axios from 'axios';
import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';


class App extends Component {
  state = {
    sellers: [],
    newSellerData: {
      loginSeller: '',
      passwordSeller: '',
      numberPassportSeller: '',
      fullNameSeller: '',
      telephoneSeller: ''
    },
    editSellerData: {
      idSeller: '',
      loginSeller: '',
      passwordSeller: '',
      numberPassportSeller: '',
      fullNameSeller: '',
      telephoneSeller: ''
    },
    newSellerModal: false,
    editSellerModal: false
  }
  componentWillMount() {
    this._refreshSellers();
  }
  toggleNewSellerModal() {
    this.setState({
      newSellerModal: ! this.state.newSellerModal
    });
  }
  toggleEditSellerModal() {
    this.setState({
      editSellerModal: ! this.state.editSellerModal
    });
  }
  addSeller() {
    axios.post('http://localhost:8080/sellers', this.state.newSellerData).then((response) => {
      let { sellers } = this.state;

      sellers.push(response.data);

      this.setState({ sellers, newSellerModal: false, newSellerData: {
        loginSeller: '',
        passwordSeller: '',
        numberPassportSeller: '',
        fullNameSeller: '',
        telephoneSeller: ''
      }});
    });
  }
  updateSeller() {
    let { idSeller, loginSeller, passwordSeller, numberPassportSeller, fullNameSeller, telephoneSeller } = this.state.editSellerData;

    axios.put('http://localhost:8080/sellers/' + this.state.editSellerData.idSeller, {
      idSeller, loginSeller, passwordSeller, numberPassportSeller, fullNameSeller, telephoneSeller
    }).then((response) => {
      this._refreshSellers();

      this.setState({
        editSellerModal: false, editSellerData: { idSeller: '', loginSeller: '', passwordSeller: '', numberPassportSeller: '', fullNameSeller: '', telephoneSeller: '' }
      })
    });
  }
  editSeller(idSeller, loginSeller, passwordSeller, numberPassportSeller, fullNameSeller, telephoneSeller) {
    this.setState({
      editSellerData: { idSeller, loginSeller, passwordSeller, numberPassportSeller, fullNameSeller, telephoneSeller }, editSellerModal: ! this.state.editSellerModal
    });
    
  }
  deleteSeller(idSeller) {
    axios.delete('http://localhost:8080/sellers/' + idSeller).then((response) => {
      this._refreshSellers();
    });
  }
  _refreshSellers() {
    axios.get('http://localhost:8080/sellers').then((response) => {
      this.setState({
        sellers: response.data
      })
    });
  }
  render() {
    let sellers = this.state.sellers.map((seller) => {
      return (
        <tr key={seller.idSeller}>
          <td>{seller.idSeller}</td>
          <td>{seller.loginSeller}</td>
          <td>{seller.passwordSeller}</td>
          <td>{seller.numberPassportSeller}</td>
          <td>{seller.fullNameSeller}</td>
          <td>{seller.telephoneSeller}</td>
          <td>
            <Button color="success" size="sm" className="mr-2" onClick={this.editSeller.bind(this, seller.idSeller, seller.loginSeller, seller.passwordSeller, seller.numberPassportSeller, seller.fullNameSeller, seller.telephoneSeller)}>Edit</Button>
            <Button color="danger" size="sm" onClick={this.deleteSeller.bind(this, seller.idSeller)}>Delete</Button>
          </td>
        </tr>
      )
    })
    return (
      <div className="App container">

        <h1>Sellers App</h1>

        <Button className="my-3" color="primary" onClick={this.toggleNewSellerModal.bind(this)}>Add Seller</Button>
        
        <Modal isOpen={this.state.newSellerModal} toggle={this.toggleNewSellerModal.bind(this)}>
        <ModalHeader toggle={this.toggleNewSellerModal.bind(this)}>Add a new seller</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="loginSeller">Login seller</Label>
            <Input id="loginSeller" value={this.state.newSellerData.loginSeller} onChange={(e) => {
              let { newSellerData } = this.state;

              newSellerData.loginSeller = e.target.value;

              this.setState({ newSellerData });
            }} />
          </FormGroup>
          <FormGroup>
            <Label for="passwordSeller">Password seller</Label>
            <Input id="passwordSeller" value={this.state.newSellerData.passwordSeller} onChange={(e) => {
              let { newSellerData } = this.state;

              newSellerData.passwordSeller = e.target.value;

              this.setState({ newSellerData });
            }} />
          </FormGroup>
          <FormGroup>
            <Label for="numberPassportSeller">Number passport seller</Label>
            <Input id="numberPassportSeller" value={this.state.newSellerData.numberPassportSeller} onChange={(e) => {
              let { newSellerData } = this.state;

              newSellerData.numberPassportSeller = e.target.value;

              this.setState({ newSellerData });
            }} />
          </FormGroup>
          <FormGroup>
            <Label for="fullNameSeller">Full name seller</Label>
            <Input id="fullNameSeller" value={this.state.newSellerData.fullNameSeller} onChange={(e) => {
              let { newSellerData } = this.state;

              newSellerData.fullNameSeller = e.target.value;

              this.setState({ newSellerData });
            }} />
          </FormGroup>
          <FormGroup>
            <Label for="telephoneSeller">Telephone seller</Label>
            <Input id="telephoneSeller" value={this.state.newSellerData.telephoneSeller} onChange={(e) => {
              let { newSellerData } = this.state;

              newSellerData.telephoneSeller = e.target.value;

              this.setState({ newSellerData });
            }} />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.addSeller.bind(this)}>Add seller</Button>{' '}
          <Button color="secondary" onClick={this.toggleNewSellerModal.bind(this)}>Cancel</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={this.state.editSellerModal} toggle={this.toggleEditSellerModal.bind(this)}>
        <ModalHeader toggle={this.toggleEditSellerModal.bind(this)}>Edit a new seller</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="loginSeller">Login seller</Label>
            <Input id="loginSeller" value={this.state.editSellerData.loginSeller} onChange={(e) => {
              let { editSellerData } = this.state;

              editSellerData.loginSeller = e.target.value;

              this.setState({ editSellerData });
            }} />
          </FormGroup>
          <FormGroup>
            <Label for="passwordSeller">Password seller</Label>
            <Input id="passwordSeller" value={this.state.editSellerData.passwordSeller} onChange={(e) => {
              let { editSellerData } = this.state;

              editSellerData.passwordSeller = e.target.value;

              this.setState({ editSellerData });
            }} />
          </FormGroup>
          <FormGroup>
            <Label for="numberPassportSeller">Number passport seller</Label>
            <Input id="numberPassportSeller" value={this.state.editSellerData.numberPassportSeller} onChange={(e) => {
              let { editSellerData } = this.state;

              editSellerData.numberPassportSeller = e.target.value;

              this.setState({ editSellerData });
            }} />
          </FormGroup>
          <FormGroup>
            <Label for="fullNameSeller">Full name seller</Label>
            <Input id="fullNameSeller" value={this.state.editSellerData.fullNameSeller} onChange={(e) => {
              let { editSellerData } = this.state;

              editSellerData.fullNameSeller = e.target.value;

              this.setState({ editSellerData });
            }} />
          </FormGroup>
          <FormGroup>
            <Label for="telephoneSeller">Telephone seller</Label>
            <Input id="telephoneSeller" value={this.state.editSellerData.telephoneSeller} onChange={(e) => {
              let { editSellerData } = this.state;

              editSellerData.telephoneSeller = e.target.value;

              this.setState({ editSellerData });
            }} />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.updateSeller.bind(this)}>Update seller</Button>{' '}
          <Button color="secondary" onClick={this.toggleEditSellerModal.bind(this)}>Cancel</Button>
        </ModalFooter>
      </Modal>

        <Table>
          <thead>
            <tr>
              <th>ID seller</th>
              <th>Login seller</th>
              <th>Password seller</th>
              <th>Number passport seller</th>
              <th>Full name seller</th>
              <th>Telephone seller</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            { sellers }
          </tbody>
        </Table>
      </div>
    );
  }
}



export default App;
