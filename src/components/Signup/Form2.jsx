import React from "react";
import "./Form.css";

function Form2({ formData, setFormData, formErrors, setFormErrors }) {
  return (
    <div className="form2">
      {formErrors.phonenumber ? (
        <input
          className="form_inputs1"
          type="text"
          placeholder={formErrors.phonenumber}
          value={formData.phonenumber}
          onChange={(e) => {
            setFormData({ ...formData, phonenumber: e.target.value });
          }}
        />
      ) : (
        <input
          className="form_inputs2"
          type="text"
          placeholder="Phone number"
          value={formData.phonenumber}
          onChange={(e) => {
            setFormData({ ...formData, phonenumber: e.target.value });
          }}
        />
      )}

      {formErrors.address ? (
        <input
          className="form_inputs1"
          type="text"
          placeholder={formErrors.address}
          value={formData.address}
          onChange={(e) => {
            setFormData({ ...formData, address: e.target.value });
          }}
        />
      ) : (
        <input
          className="form_inputs2"
          type="text"
          placeholder="Address"
          value={formData.address}
          onChange={(e) => {
            setFormData({ ...formData, address: e.target.value });
          }}
        />
      )}
      {formErrors.linkedin ? (
        <input
          className="form_inputs1"
          type="text"
          placeholder={formErrors.linkedin}
          value={formData.linkedin}
          onChange={(e) => {
            setFormData({ ...formData, linkedin: e.target.value });
          }}
        />
      ) : (
        <input
          className="form_inputs2"
          type="text"
          placeholder="Linkedin"
          value={formData.linkedin}
          onChange={(e) => {
            setFormData({ ...formData, linkedin: e.target.value });
          }}
        />
      )}

      {formErrors.interests ? (
        <input
          className="form_inputs1"
          type="text"
          placeholder={formErrors.interests}
          value={formData.interests}
          onChange={(e) => {
            setFormData({ ...formData, interests: e.target.value });
          }}
        />
      ) : (
        <input
          className="form_inputs2"
          type="text"
          placeholder="Interests"
          value={formData.interests}
          onChange={(e) => {
            setFormData({ ...formData, interests: e.target.value });
          }}
        />
      )}
    </div>
  );
}

export default Form2;
