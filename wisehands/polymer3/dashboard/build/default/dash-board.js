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
                .container{
                    display: flex;
                }
                .column{
                    flex-direction: column;
                }
                .row{
                    flex-direction: row;
                }
                .border{
                    border: 2px solid black;
                }
                .profile{
                    height: 50px;
                }
                .tools{
                    width: 25%;
                }
                .shops-place{
                    align-items: flex-start;
                    flex-wrap: wrap;
                    width: 75%;
                }
                .work-place{
                    height: calc(100vh - 50px);
                }
                .shop-element{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin: 15px;
                    height: 200px;
                    width: 200px;
                }
                .shop-element p
            </style>
                                    
            <div class="profile container row border"></div>
            <div class="work-place container row border">
                <div class="tools container border"></div>
                <div class="container row shops-place border">
                    <a href="/ua/wizard">
                        <div class="shop-element create-shop border">
                            <p>+</p>
                        </div>
                    </a>
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
  }

  _buildUrlForShop(item){
    return `${window.location.protocol}//${item.domain}:${window.location.port}/admin`;
    console.log("_buildUrlForShop => ", item);
  }

  getShopList() {
    const _this = this;

    const url = '/shops';
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
      _this.shopList = data;
      console.log("response data: ", data);
    });
  }

} // Register the new element with the browser.


customElements.define('dash-board', DashBoard);