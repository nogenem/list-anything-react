import ActionBtnsContainer from "../ActionBtnsContainer";

const setup = (propOverrides = {}) => {
  const props = {
    onMenu: jest.fn(),
    onAdd: jest.fn(),
    onEdit: jest.fn(),
    onDelete: jest.fn(),
    ...propOverrides
  };

  document.body.innerHTML = "";

  return {
    props,
    wrapperShallow: wrapperShallow(ActionBtnsContainer, props),
    // Lembrar de sempre chamar `unmount` quando usar esse wrapper \/
    wrapperMount: wrapperMount(ActionBtnsContainer, props)
  };
};

describe("ActionBtnsContainer", () => {
  it("renders correctly when passed all props", () => {
    const { wrapperShallow: wrapper } = setup();
    expect(wrapper()).toMatchSnapshot();
  });

  it("renders correctly when passed only `onAdd` and `onDelete`", () => {
    const { wrapperShallow: wrapper } = setup({ onMenu: null, onEdit: null });
    expect(wrapper()).toMatchSnapshot();
  });

  it("calls `onMenu`, `onAdd` and `onEdit` when the buttons are clicked", () => {
    const { wrapperMount: wrapper, props } = setup({ onDelete: null });

    wrapper()
      .find("Button")
      .find({ icon: "sidebar" })
      .simulate("click");
    expect(props.onMenu).toHaveBeenCalled();

    wrapper()
      .find("Button")
      .find({ icon: "plus" })
      .simulate("click");
    expect(props.onAdd).toHaveBeenCalled();

    wrapper()
      .find("Button")
      .find({ icon: "edit" })
      .simulate("click");
    expect(props.onEdit).toHaveBeenCalled();

    wrapper().unmount();
  });

  describe("when the delete button is clicked", () => {
    let wrapper;
    let props;

    beforeEach(() => {
      // Só me importo com o onDelete agora
      const tmp = setup({
        onMenu: null,
        onEdit: null,
        onAdd: null
      });
      wrapper = tmp.wrapperMount;
      props = tmp.props;
    });

    afterEach(() => {
      wrapper().unmount();
    });

    it("shows the confirm message", () => {
      wrapper()
        .find("Button")
        .find({ icon: "delete" })
        .simulate("click");

      expect(
        wrapper()
          .find("Confirm")
          .props().open
      ).toBe(true);
    });

    it("calls `onDelete` when the `OK` button is clicked", () => {
      wrapper()
        .find("Button")
        .find({ icon: "delete" })
        .simulate("click");

      document.body.querySelector(".modal .actions button.primary").click();
      expect(props.onDelete).toHaveBeenCalled();
    });

    it("closes the modal when the `Cancel` button is clicked", () => {
      wrapper()
        .find("Button")
        .find({ icon: "delete" })
        .simulate("click");

      document.body.querySelector(".modal .actions button").click();

      wrapper().update();
      expect(
        wrapper()
          .find("Confirm")
          .props().open
      ).toBe(false);
    });
  });
});
