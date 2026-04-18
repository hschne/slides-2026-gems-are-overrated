import type { MermaidConfig } from 'mermaid'
import { defineMermaidSetup } from '@slidev/types'

export default defineMermaidSetup((): Partial<MermaidConfig> => {
  return {
    theme: 'base',
    xyChart: {
      useMaxWidth: false,
      width: 1400,
      height: 760,
      titleFontSize: 28,
      xAxis: {
        labelFontSize: 18,
        titleFontSize: 20,
      },
      yAxis: {
        labelFontSize: 18,
        titleFontSize: 20,
      },
    },
    themeVariables: {
      fontFamily: 'IBM Plex Mono',
      background: 'transparent',
      mainBkg: 'transparent',
      textColor: '#DEDEDE',
      primaryColor: '#DEDEDE',
      primaryTextColor: '#DEDEDE',
      lineColor: '#DEDEDE',
      secondaryColor: '#7A7A7A',
      tertiaryColor: '#474747',
      xyChart: {
        backgroundColor: 'transparent',
        titleColor: '#DEDEDE',
        xAxisTitleColor: '#DEDEDE',
        xAxisLabelColor: '#DEDEDE',
        xAxisTickColor: '#DEDEDE',
        xAxisLineColor: '#DEDEDE',
        yAxisTitleColor: '#DEDEDE',
        yAxisLabelColor: '#DEDEDE',
        yAxisTickColor: '#DEDEDE',
        yAxisLineColor: '#DEDEDE',
        plotColorPalette: '#6CB6FF, #F69D50, #96D0FF, #FFB86B',
      },
    },
  }
})
