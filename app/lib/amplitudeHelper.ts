import { BaseAmplitudeHelper } from "app/common/lib/baseAmplitudeHelper";

const ExtAmplitudeHelper = {
  trackCardItemAction: (source: string, value: string, from: string) => {
    const props = {
      source,
      value,
      from
    }
    return BaseAmplitudeHelper.track('card item actions', props)
  },
  trackSearch: (variables: Object, from: string) => {
    const props = {
      variables,
      from
    }
    return BaseAmplitudeHelper.track('search', props);
  },

};

const AmplitudeHelper = { ...BaseAmplitudeHelper, ...ExtAmplitudeHelper }
export { AmplitudeHelper };
