import { Formik, Form, Field } from "formik";
import { useState, useEffect } from "react";
// import axios from "axios"; // Or use your preferred method to fetch data

const initialValues = {
  name: "",
  email: "",
  // Add other fields from MongoDB here
};

export default function MyForm({ params }) {
  const [formData, setFormData] = useState(initialValues);
  const { id } = params;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ferch(
          `http://localhost:3000/api/users/update/${id}`
        );
        const fetchedData = response.data; // Data fetched from MongoDB
        setFormData({
          ...initialValues, // Keep existing initialValues
          ...fetchedData, // Update specific values from MongoDB
        });
      } catch (error) {
        // Handle error
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = (values, actions) => {
    // Handle form submission with updated values
    // Send values to MongoDB or per/form necessary actions
    // For example:
    console.log("Updated values:", values);

    // Reset form after submission
    actions.resetForm();
  };

  return (
    <Formik initialValues={formData} onSubmit={handleSubmit}>
      {({ isSubmitting }) => (
        <Form>
          <Field type="text" name="name" />
          <Field type="email" name="email" />
          {/* Add other fields as needed */}
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
}
