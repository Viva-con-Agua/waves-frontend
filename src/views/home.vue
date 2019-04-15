<template>
<VcAFrame>
    <VcAColumn size="70%">
        <VcABox title="Event">
                <div class="user">
                    <Avatar :user="user" type="profile" />
                    <div class="vca-profile">
                        <ul class="crew">
                            <li>
                                <span class="vca-user-label">type</span>
                                <span class="vca-user-value">Festival</span>
                            </li>
                            <li>
                                <span class="vca-user-label">website:</span>
                                <span class="vca-user-value" >www.helloWorld.com</span>

                            </li>
                            <li>
                                <span class="vca-user-label">state:</span>
                                <span class="vca-user-value" >state</span>

                            </li>
                        </ul>
                        <ul class="crew">
                            <li>
                                <span class="vca-user-label">location:</span>
                                <span class="vca-user-value" >address</span>
                            </li>
                            <li>
                                <span class="vca-user-label">location note:</span>
                                <span class="vca-user-value" >Bilal dhabuhari waha ekka senni</span>
                            </li>
                            <li>
                                <span class="vca-user-label">map:</span>
                                <span class="vca-user-value" ></span>
                            </li>
                        </ul>
                        

                        <ul class="demographics">
                            <li>
                                <span class="vca-user-label">state:</span>
                                <span class="vca-user-value">[state]</span>
                            </li>
                        </ul>
                    </div>
                </div>
        </VcABox>
    </VcAColumn>
</VcAFrame>    
</template>

<script>
import { VcAFrame, VcAColumn, VcABox } from "vca-widget-base";
import "vca-widget-base/dist/vca-widget-base.css";
export default {
    name : "home",
components :{
    VcAFrame, VcAColumn, VcABox 
}
}
</script>

<style scoped lang="less">
@import '../assets/less/responsive.less';
    .vca-button-select-crew {
        padding-left: 0.5em;
        padding-right: 0.5em;
    }
    .user {
        display: flex;
        justify-content: flex-start;
        align-item: flex-start;
        align-content: flex-start;
        @media @phone-down {
            flex-direction: column;
        }
    }
    .notConfirmed {
        color: white;
        background-color: rgba(213, 0, 0, 1);
        padding: 0.3em;
        font-size: 0.9em;
        border-radius: 0.5em;
        margin: 0.2em;
    }
    .roles {
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: flex-start;
        & /deep/ .role:not(:first-child) {
            margin-left: 0.2em;
        }
    }
    .roleButtons {
        margin-bottom: 0.5em;
        button {
            margin-top: 0.5em;
            &:not(:last-child) {
                margin-right: 0.5em;
            }
        }
    }
    .vca-profile {
        margin-left: 2em;
        list-style: none;
        flex-grow: 2;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        @media @phone-down {
            margin-left: 0;
        }
        ul {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            margin: 0;
            padding: 0;
            li {
                display: flex;
                flex-direction: column;
            }
            &.crew {
                align-items: flex-start;
            }
            &.contact {
                flex-direction: column;
            }
            &.demographics {
                justify-content: flex-end;
                li {
                    margin-left: 2em;
                    flex-direction: row;
                    align-items: baseline;
                    .vca-user-value {
                        margin-left: 0.3em;
                    }
                }
            }
        }
    }
    .vca-user-label {
        /*font-style: italic;*/
        font-weight: bold;
    }
    .vca-user-value {
        font-size: 1.4em;
    }
</style>
