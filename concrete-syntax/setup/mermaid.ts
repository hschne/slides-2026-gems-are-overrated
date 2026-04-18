import type { MermaidConfig } from 'mermaid'
import { defineMermaidSetup } from '@slidev/types'

export default defineMermaidSetup((): Partial<MermaidConfig> => {
  return {
    theme: 'base',
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
        plotColorPalette: '#6CB6FF, #DCBDFB, #96D0FF, #B083F0',
      },
    },
  }
})
