import React from "react";
import { Segment, Grid } from "semantic-ui-react";
import DisplayBalance from "./DisplayBalance";

export default function DisplayGrid({totalIncome, totalExpenses}){
    return(
          <Segment textAlign="center">
          <Grid columns ={2} divided>
          <Grid.Row>
            <Grid.Column>
                <DisplayBalance title="Income" value={totalIncome} color="green"/>             
            </Grid.Column>
            <Grid.Column>
                <DisplayBalance title="Expenses" value={totalExpenses} color="red"/>   
            </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
    )
}