import { ComponentProps } from 'lib/component-props';

const Separator = (props: ComponentProps): JSX.Element => {
  return (
    <div className={`${props.params.styles} separator`}>
      <hr></hr>
    </div>
  );
};

export default Separator;
