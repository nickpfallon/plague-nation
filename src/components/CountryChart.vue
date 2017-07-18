<!-- <template>
  <canvas ref="canvas" id="chart-canvas" style="width: 400px; height: 300px"></canvas>
</template>

<script>
import {Doughnut} from 'vue-chartjs'

export default Doughnut.extend({
  name: 'doughnutChart',
  data () {
    return {
      datacollection: {
        labels: ['Fever', 'Cough', 'Sore Throat', 'Chills', 'Headache', 'Runny Nose'],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: ['#f87979', '#D11A02', '#bc4747', '#bc4747', '#770000', '#ff2b2b'],
            data: [30, 20, 40, 10, 15, 5]
          }
        ]
      }
    }
  },
  mounted () {
    this.renderChart(this.datacollection, {responsive: false, maintainAspectRatio: false})
  }
})
</script>

<style>

</style> -->
