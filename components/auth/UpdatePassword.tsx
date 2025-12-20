import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react'; 
import { Label } from '@radix-ui/react-label';
import { Input } from '@/components/ui/input';
import { useMediaQuery } from "@/hooks/use-media-query";

function UpdatePassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const isDesktop2xl = useMediaQuery("(max-width: 1530px)");

  const handleSubmit = (e:any) => {
    e.preventDefault();

    // Check if new password and confirm password are the same
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    // Proceed with password reset logic (e.g., API call)
    setError(''); // Clear any previous error
    console.log('Password reset successful!');
    // Add additional logic here
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
         <div> 
         <label>New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Reset Password</button> 

<Label className="my-4 font-medium text-default-600 ">
                    Enter New Password
                  </Label>
                  <Input
                   
                    type="password"
                    id="newpassword"
                    className=" "
                    placeholder="New Password"
                   
                    size={!isDesktop2xl ? "lg" : "md"}
                  />
        <Label className="my-4 font-medium text-default-600 ">
                    Confirm New Password
                  </Label>
                  <Input
                   
                    type="password"
                    id="confirmpassword"
                    className=" "
                    placeholder="Confirm New Password"
                    
                    size={!isDesktop2xl ? "lg" : "md"}
                  />

            <Button
              className="w-full mt-6 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400"
              type="submit"
            >
              Update Password
            </Button> 
        
</form>
    </div>
  );
}

export default UpdatePassword;