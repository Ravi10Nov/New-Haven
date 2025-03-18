import React from "react"
export const StatsIndicator = ({indicatorValue}) => {
    if(indicatorValue == 0){
        return(
            <button className="!bg-yellow-400">


            <span class='material-icons-outlined '>arrow_right_alt</span>{' '}
            
            </button>

        );
    }
    if(indicatorValue > 0){
        return(
            <button className="!bg-green-500">
            <span class='material-icons-outlined'>trending_up</span>{' '}
            {indicatorValue}
    
            </button>
        )
    }
    if(indicatorValue < 0){
        return(
            <button className="!bg-red-500">
            <span class='material-icons-outlined '>trending_down</span>{' '}
            {indicatorValue}
            </button>
        )
    }
}
