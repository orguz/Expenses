/**
 * Created by orguz on 11/29/14.
 */
expensesApp.controller('LiveChartCtrl', ['$scope', function ($scope) {

    $scope.barOptions = {
        scaleBeginAtZero : true,
        scaleShowGridLines : true,
        scaleGridLineColor : "rgba(0,0,0,.05)",
        scaleGridLineWidth : 1,
        barShowStroke : true,
        barStrokeWidth : 2,
        barValueSpacing : 5,
        barDatasetSpacing : 1
    };

    /**
     * Data for Bar chart
     */
    $scope.barData = {
        labels: ["Food", "Alcohol", "Rent", "Other"],
        datasets: [
            {
                label: "My First dataset",
                fillColor: "rgba(26,179,148,0.5)",
                strokeColor: "rgba(26,179,148,0.8)",
                highlightFill: "rgba(26,179,148,0.75)",
                highlightStroke: "rgba(26,179,148,1)",
                data: [3200,800,1120,600]
            }
        ]
    };


}]);
