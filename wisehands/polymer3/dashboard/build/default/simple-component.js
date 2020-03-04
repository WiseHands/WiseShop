// Import the LitElement base class and html helper function
import { LitElement, html } from "./node_modules/lit-element/lit-element.js"; // Extend the LitElement base class

class SimpleComponent extends LitElement {
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
                    margin: 15px;
                    height: 200px;
                    width: 200px;
                }
            </style>
                                    
            <div class="profile container row border">

            </div>
            <div class="work-place container row border">
                <div class="tools container border"></div>
                <div class="container row shops-place border">
                    <div class="shop-element border"></div>
                    <div class="shop-element border"></div>
                    <div class="shop-element border"></div>
                    <div class="shop-element border"></div>
                    <div class="shop-element border"></div>
                    <div class="shop-element border"></div>
                    <div class="shop-element border"></div>
                    <div class="shop-element border"></div>
                    <div class="shop-element border"></div>
                    
                </div>
            </div>
        `;
  }

  static get properties() {
    return {
      message: {
        type: String
      },
      boolValue: {
        type: Boolean
      }
    };
  }

  constructor() {
    super();
    this.message = 'Hello bro! What is your name?';
    this.boolValue = true;
  }

  clickHandler(event) {
    console.log('event from click', event);
    this.boolValue = !this.boolValue;
  }

} // Register the new element with the browser.


customElements.define('simple-component', SimpleComponent);