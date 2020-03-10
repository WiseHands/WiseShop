// Import the LitElement base class and html helper function
import { LitElement, html } from "./node_modules/lit-element/lit-element.js"; // Extend the LitElement base class

class DashBoard extends LitElement {
  /**
   * Implement `render` to define a template for your element.
   *
   * You must provide an implementation of `render` for any element
   * that uses LitElement as a base class.
   */
  render() {
    return html`
            <style>
                body{
                    height: 100vh;
                }
                .border{
                    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .16), 0 2px 10px 0 rgba(0, 0, 0, .12);
                }
                a {
                    text-decoration: none;
                }
                .header-profile-container{
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    height: 56px;
                }
                .profile-info{
                    height: 48px;
                    width: 48px;
                }
                .body-dash-board-container{
                    display: flex;
                }
                .shops-place{
                    display: flex;
                    flex-direction: row;
                    align-items: flex-start;
                    flex-wrap: wrap;
                    width: 75%;
                }
                .shop-element{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin: 15px;
                    height: 200px;
                    width: 200px;
                }
                .tools-dash-board-container{
                    width: 25%;
                    background-color: #40b9ff; 
                }
                
            </style>
                                    
            <div class="header-profile-container border">
                <div class="profile-info">
                    <p>O.P</p>
                </div>
            </div>
            <div class="body-dash-board-container">
                <div class="tools-dash-board-container border"></div>
                <div class="shops-place border">
                    <div class="shop-element create-shop border">
                        <a href="/ua/wizard">
                            <div class="shop-element create-shop border">
                                <p>+</p>
                            </div>
                        </a>
                    </div>
                    ${this.shopList.map(item => html`
                           <a href="${this._buildUrlForShop(item)}">
                               <div class="shop-element border">
                                    <p>${item.shopName}</p>
                               </div>
                           </a>    
                    `)}                    
                </div>
            </div>
    `;
  }

  static get properties() {
    return {
      shopList: {
        type: Array,
        value: []
      }
    };
  }

  constructor() {
    super();
    this.getShopList();
    this.shopList = [];
  }

  _buildUrlForShop(item) {
    const token = localStorage.getItem('JWT_TOKEN');
    return `${window.location.protocol}//${item.domain}:${window.location.port}/admin?JWT_TOKEN=${token}`;
  }

  getShopList() {
    const _this = this;

    const url = '/api/dashboard/shops';
    let token = localStorage.getItem('JWT_TOKEN');
    fetch(url, {
      method: 'GET',
      headers: {
        authorization: 'Bearer ' + token
      }
    }).then(function (response) {
      console.log("response response: ", response);
      return response.json();
    }).then(function (data) {
      console.log('data: ', data);

      if (data) {
        _this.shopList = data;
      }

      console.log("response data: ", data);
    });
  }

} // Register the new element with the browser.


customElements.define('dash-board', DashBoard);