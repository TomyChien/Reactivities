import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";

interface Props {
    inverted?: boolean; //不一定會有inverted資料所以增加?
    content?: string; //無content時自動初始值
}
export default function LoadingComponent({inverted = true, content = '載入中...'}:Props) {
    return (
        <Dimmer active={true} inverted={inverted}>
            <Loader content={content} />

        </Dimmer>
    )
}