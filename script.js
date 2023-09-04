let kickstarterDataUrl = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/kickstarter-funding-data.json'

let kickstarterData

let canvas = d3.select('#canvas')
let tooltip = d3.select('#tooltip')

let drawTreemap = () => {
  let hierarchy = d3.hierarchy(kickstarterData, (node) => {
    return node['children']
  }).sum((node) => {
    return node['value']
  }).sort((node1, node2) => {
    return node2['value'] - node1['value']
  })

  let createTreeMap = d3.treemap()
                       .size([1000, 600])

  createTreeMap(hierarchy)

let kickstarterTile = hierarchy.leaves()
  console.log(kickstarterTile)

  let block = canvas.selectAll('g')
                    .data(kickstarterTile)
                    .enter()
                    .append('g')
                    .attr('transform', (kickstarter) => {
                      return 'translate(' + kickstarter['x0'] + ', ' + kickstarter['y0'] + ')'
                    })

  block.append('rect')
       .attr('class', 'tile')
       .attr('fill', (kickstarter) => {
         let category = kickstarter['data']['category']
         if(category === 'Product Design') {
           return 'skyblue'
         } else if(category === 'Tabletop Games') {
           return 'orange'
         } else if(category === 'Gaming Hardware') {
           return 'Lightgreen'
         } else if(category === 'Video Games') {
           return 'coral'
         } else if(category === 'Sound') {
           return 'gold'
         } else if(category === 'Narrative Film') {
           return 'violet'
         } else if(category === 'Hardware') {
           return 'lightblue'
         } else if(category === 'Games') {
           return 'purple'
         } else if(category === 'Web') {
           return 'lightgray'
         } else if(category === 'Television') {
           return 'blue'
         } else if(category === 'Art') {
           return 'pink'
         } else if(category === '3D Printing') {
           return 'khaki'
         } else if(category === 'Technology') {
           return 'gray'
         } else if(category === 'Wearables') {
           return 'tan'
         } else if(category === 'Sculpture') {
           return 'red'
         } else if(category === 'Apparel') {
           return 'yellow'
         } else if(category === 'Food') {
           return 'whitesmoke'
         } else if(category === 'Gadgets') {
           return 'green'
         } else if(category === 'Drinks') {
           return 'silver'
         }
       })
       .attr('data-name', (kickstarter) => {
         return kickstarter['data']['name']
       })
       .attr('data-category', (kickstarter) => {
         return kickstarter['data']['category']
       })
       .attr('data-value', (kickstarter) => {
         return kickstarter['data']['value']
       })
       .attr('width', (kickstarter) => {
         return kickstarter['x1'] - kickstarter['x0']
       })
       .attr('height', (kickstarter) => {
         return kickstarter['y1'] - kickstarter['y0']
       })
       .on('mouseover', (kickstarter) => {
         tooltip.transition()
                .style('visibility', 'visible')

        let revenue = kickstarter['data']['value'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        tooltip.html(
          '$ ' + revenue + '<hr />' + kickstarter['data']['name']
        )
        tooltip.attr('data-value', kickstarter['data']['value'])
       })
       .on('mouseout', (kickstarter) => {
         tooltip.transition()
                .style('visibility', 'hidden')
       })

  block.append('text')
       .text((kickstarter) => {
         return kickstarter['data']['name']
       })
       .attr('x', 5)
       .attr('y', 20)
}

d3.json(kickstarterDataUrl).then(
  (data, error) => {
    if(error) {
      console.log(error)
    } else {
      kickstarterData = data;
      console.log(kickstarterData)
      drawTreemap()
    }
  }
)
