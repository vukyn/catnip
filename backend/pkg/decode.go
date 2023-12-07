package pkg

import "github.com/mitchellh/mapstructure"

func DecodeMap[T any](in map[string]interface{}) (*T, error) {
	out := new(T)
	config := &mapstructure.DecoderConfig{
		Metadata: nil,
		Result:   out,
		TagName:  "json",
	}
	decoder, err := mapstructure.NewDecoder(config)
	if err != nil {
		return nil, err
	}
	if err := decoder.Decode(in); err != nil {
		return nil, err
	}
	return out, nil
}
