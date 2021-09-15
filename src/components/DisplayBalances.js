import React from "react";
import { Statistic } from "semantic-ui-react";

export default function DisplayBalance({title, balance, color="black", size="mini"}){
    return(
        <Statistic size={size} color={color}>
        <Statistic.Label >{title}</Statistic.Label>
        <Statistic.Value>{balance}</Statistic.Value>
        </Statistic>
    )
}
